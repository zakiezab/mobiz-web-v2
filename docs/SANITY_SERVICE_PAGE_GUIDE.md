# Sanity CMS - Service Page Content Guide

This guide explains how to add and edit content for service pages in Sanity CMS.

## Image Size Recommendations

### 1. Hero Image
- **Recommended Size:** 1200x800px (3:2 aspect ratio)
- **Format:** JPG or PNG
- **File Size:** Optimize to under 500KB for fast loading
- **Purpose:** Main hero image displayed at the top of the service page
- **Fallback:** If no image is uploaded, the default image (`/images/service-hero.png`) will be used

### 2. Core Capabilities Images
- **Recommended Size:** 600x400px (3:2 aspect ratio)
- **Format:** JPG or PNG
- **File Size:** Optimize to under 200KB per image
- **Purpose:** Optional images for each capability card
- **Display:** Images appear at the top of each capability card

### 3. Features Section Image
- **Recommended Size:** 800x600px (4:3 aspect ratio)
- **Format:** JPG or PNG
- **File Size:** Optimize to under 300KB
- **Purpose:** Main image for the features section
- **Display:** Large hero-style image above the feature items

### 4. Feature Items Images
- **Recommended Size:** 400x300px (4:3 aspect ratio)
- **Format:** JPG or PNG
- **File Size:** Optimize to under 150KB per image
- **Purpose:** Images for individual feature items
- **Display:** Small card images in the feature items grid

### 5. Additional Sections Images
- **Recommended Size:** 1200x800px (3:2 aspect ratio)
- **Format:** JPG or PNG
- **File Size:** Optimize to under 500KB
- **Purpose:** Images for additional custom sections
- **Display:** Full-width images within the section

### 6. Additional Sections Videos
- **Recommended Format:** MP4, WebM
- **File Size:** Optimize for web (consider using CDN or YouTube/Vimeo)
- **Purpose:** Video content for additional sections
- **Options:** 
  - Upload video file directly to Sanity
  - Or provide YouTube/Vimeo URL

## How to Add Content in Sanity

### 1. Hero Image

1. Go to **Service Page** in Sanity Studio
2. Select the service you want to edit
3. Find the **Hero Image** field
4. Click **Upload** or **Select** to choose an image
5. **Recommended:** Use an image that is 1200x800px (3:2 aspect ratio)
6. If no image is uploaded, the default image will be used automatically

### 2. Core Capabilities with Images

1. In the **Core Capabilities** section, click on a capability item
2. You'll see fields for:
   - **Title** (required)
   - **Description** (optional)
   - **Image** (optional) - NEW!
3. To add an image:
   - Click **Upload** or **Select** next to the Image field
   - **Recommended:** Use an image that is 600x400px (3:2 aspect ratio)
   - The image will appear at the top of the capability card

### 3. Features Section (New!)

1. Scroll down to the **Features Section** (collapsible section)
2. Fill in the fields:
   - **Kicker** (optional) - Small label above the title
   - **Title** (required) - Main section title
   - **Description** (optional) - Section description
   - **Image** (optional) - Large hero image for the section
     - **Recommended:** 800x600px (4:3 aspect ratio)
3. Add **Items** to the section:
   - Click **Add item** to create a new feature item
   - Each item has:
     - **Image** (optional) - **Recommended:** 400x300px (4:3 aspect ratio)
     - **Title** (required)
     - **Description** (optional)
4. Items will display in a responsive grid (2 columns on tablet, 3 on desktop)

### 4. Additional Sections (New!)

1. Scroll down to **Additional Sections**
2. Click **Add item** to create a new section
3. Fill in the fields:
   - **Kicker** (optional) - Small label above the title
   - **Title** (required) - Section title
   - **Description** (optional) - Section description
   - **Image / Video** (optional):
     - Select **Media Type**: Image or Video
     - **For Image:**
       - Click **Upload** or **Select** to choose an image
       - **Recommended:** 1200x800px (3:2 aspect ratio)
     - **For Video:**
       - Option 1: Provide **Video URL** (YouTube, Vimeo, etc.)
       - Option 2: Upload **Video File** (MP4, WebM, etc.)
   - **Content Alignment:**
     - **Start (Left)** - Content aligned to the left
     - **Center** - Content centered
     - **End (Right)** - Content aligned to the right
4. You can add multiple additional sections - they will display in order

## Content Structure

### Service Page Sections (in order):

1. **Hero Section**
   - Hero Image (optional, falls back to default)
   - Hero Headline
   - Hero Subheadline

2. **Problem Section** (optional)
   - Problem Headline
   - Problem Description
   - Solution Description

3. **Core Capabilities** (optional)
   - Grid of capability cards
   - Each card can have:
     - Image (optional)
     - Title
     - Description

4. **Features Section** (optional, NEW!)
   - Kicker (optional)
   - Title
   - Description
   - Main Image (optional)
   - Items Grid:
     - Each item has:
       - Image (optional)
       - Title
       - Description

5. **Additional Sections** (optional, NEW!)
   - Multiple custom sections
   - Each section has:
     - Kicker (optional)
     - Title
     - Description
     - Image or Video (optional)
     - Alignment (start/center/end)

6. **Proof Section** (optional)
   - Proof Kicker
   - Proof Metric
   - Proof Context
   - Proof Body
   - Case Study Link

7. **Related Services** (auto-generated)
   - Shows other services from the same category

8. **CTA Section** (optional)
   - CTA Headline
   - CTA Body

## Best Practices

### Image Optimization:
- **Always optimize images** before uploading to Sanity
- Use tools like TinyPNG, ImageOptim, or Photoshop to compress images
- Aim for file sizes under 500KB for large images, under 200KB for smaller images
- Use JPG for photos, PNG for graphics with transparency

### Content Guidelines:
- **Hero Images:** Use high-quality, relevant images that represent the service
- **Capability Images:** Use icons, diagrams, or relevant imagery
- **Feature Images:** Use visuals that support the feature description
- **Video Content:** Consider using YouTube or Vimeo for better performance and streaming

### Alignment:
- **Start (Left):** Best for text-heavy content
- **Center:** Best for hero-style sections with images
- **End (Right):** Best for alternative layouts

## Troubleshooting

### Images Not Appearing:
1. Check that the image is uploaded and published in Sanity
2. Verify the image URL is accessible
3. Clear browser cache
4. Check browser console for errors

### Videos Not Playing:
1. For video URLs, ensure the URL is correct and accessible
2. For video files, check that the file format is supported (MP4, WebM)
3. Large video files may take time to load - consider using a CDN or video hosting service

### Sections Not Displaying:
1. Ensure the section has a **Title** (required field)
2. Check that the section is published in Sanity
3. Verify the section data is being fetched correctly

## Example Usage

### Adding a Features Section:

1. Open a service page in Sanity
2. Expand the **Features Section** (click to expand)
3. Fill in:
   - **Kicker:** "Why Choose Us"
   - **Title:** "Key Features"
   - **Description:** "Discover what makes our service unique"
   - **Image:** Upload a 800x600px image
4. Add items:
   - **Item 1:**
     - Image: Upload 400x300px image
     - Title: "Feature 1"
     - Description: "Description of feature 1"
   - **Item 2:**
     - Image: Upload 400x300px image
     - Title: "Feature 2"
     - Description: "Description of feature 2"
5. Click **Publish**

### Adding an Additional Section:

1. Scroll to **Additional Sections**
2. Click **Add item**
3. Fill in:
   - **Kicker:** "Learn More"
   - **Title:** "How It Works"
   - **Description:** "Step-by-step process"
   - **Media Type:** Image
   - **Image:** Upload 1200x800px image
   - **Alignment:** Center
4. Click **Publish**

## Need Help?

- Check the Sanity documentation: https://www.sanity.io/docs
- Review the service page schema: `apps/web/sanity/schemas/servicePage.ts`
- Check the service page component: `apps/web/src/app/services/[slug]/page.tsx`

