import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb/mongoose';
import Url from '../../lib/mongodb/models/Url';

export async function GET(request, context) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Properly handle the params from context
    const shortCode = context.params.shortCode;
    
    if (!shortCode) {
      return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    }
    
    // Get the URL data from the database
    const urlData = await Url.findOne({ shortCode });
    
    // If the URL doesn't exist, redirect to the home page
    if (!urlData) {
      return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    }
    
    // Check if the URL has expired
    if (urlData.expiresAt && new Date() > new Date(urlData.expiresAt)) {
      return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    }
    
    // Increment the click count
    urlData.clicks += 1;
    await urlData.save();
    
    // Redirect to the original URL
    return NextResponse.redirect(urlData.originalUrl);
  } catch (error) {
    console.error('Error redirecting URL:', error);
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }
} 