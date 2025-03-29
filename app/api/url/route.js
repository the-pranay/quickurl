import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '../../../lib/mongodb/mongoose';
import Url from '../../../lib/mongodb/models/Url';

// Generate a short code for the URL
function generateShortCode(length = 6) {
  return crypto.randomBytes(length).toString('base64')
    .replace(/[+/=]/g, '')  // Remove non-URL safe characters
    .substring(0, length);
}

// Create a new short URL
export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();
    
    const { url, customAlias } = await request.json();
    
    // Validate URL
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    
    try {
      new URL(url); // Validate URL format
    } catch (error) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }
    
    // Handle custom alias if provided
    let shortCode;
    if (customAlias) {
      // Check if custom alias is already taken
      const existingUrl = await Url.findOne({ shortCode: customAlias });
      if (existingUrl) {
        return NextResponse.json({ error: 'Custom alias already taken' }, { status: 409 });
      }
      shortCode = customAlias;
    } else {
      // Generate a short code until we find an unused one
      let isUnique = false;
      while (!isUnique) {
        shortCode = generateShortCode();
        const existingUrl = await Url.findOne({ shortCode });
        isUnique = !existingUrl;
      }
    }
    
    // Store the URL with its short code
    const newUrl = new Url({
      shortCode,
      originalUrl: url,
      createdAt: new Date(),
      clicks: 0
    });
    
    await newUrl.save();
    
    const baseUrl = process.env.BASE_URL || request.headers.get('origin');
    
    return NextResponse.json({ 
      shortCode,
      shortUrl: `${baseUrl}/${shortCode}`,
      originalUrl: url
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
    return NextResponse.json({ error: 'Failed to create short URL' }, { status: 500 });
  }
}

// Get a URL by its short code
export async function GET(request) {
  try {
    // Connect to the database
    await dbConnect();
    
    const url = new URL(request.url);
    const shortCode = url.searchParams.get('code');
    
    if (!shortCode) {
      return NextResponse.json({ error: 'Short code is required' }, { status: 400 });
    }
    
    const urlData = await Url.findOne({ shortCode });
    if (!urlData) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }
    
    // Update click count
    urlData.clicks += 1;
    await urlData.save();
    
    return NextResponse.json({
      shortCode: urlData.shortCode,
      originalUrl: urlData.originalUrl,
      clicks: urlData.clicks,
      createdAt: urlData.createdAt
    });
  } catch (error) {
    console.error('Error retrieving short URL:', error);
    return NextResponse.json({ error: 'Failed to retrieve URL' }, { status: 500 });
  }
} 