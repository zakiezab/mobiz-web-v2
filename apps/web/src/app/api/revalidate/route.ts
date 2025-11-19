import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Sanity
    const secret = request.nextUrl.searchParams.get('secret');
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const body = await request.json();
    const { type, slug } = body;

    // Revalidate based on document type
    switch (type) {
      case 'servicePage':
        if (slug) {
          revalidatePath(`/services/${slug}`);
          revalidatePath('/services'); // Revalidate service listing page
        }
        break;
      
      case 'caseStudy':
        if (slug) {
          revalidatePath(`/case-studies/${slug}`);
          revalidatePath('/case-studies'); // Revalidate case studies listing page
        }
        break;
      
      case 'aboutUsPage':
        revalidatePath('/about-us');
        break;
      
      case 'category':
        revalidatePath('/services'); // Services page uses categories
        break;
      
      default:
        // If no specific type, revalidate all pages that use Sanity
        revalidatePath('/', 'layout');
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      type,
      slug 
    });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}

