import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_API_KEY
});

export async function POST(req: NextRequest) {
  try {
    const { artist, concert, section, venue, date } = await req.json();

    const contents = 
    `A vertical trading card design in a 16-bit pixel art style. The top half is blank - for an other image to be inserted. 
    
    The bottom half is a structured UI layout for a concert tickaet. 

    Don't write anything more except what's below: 

    Include a 'Section Number' at the top right with the section number as ${section}. Blend this section with the overrall bottom UI

    Then write name of concert: ${concert}

    Then write: ${artist}

    Then add a section called Date with the date ${date}

    Then add a section called Venue with the venue ${venue}.

    Don't add any extra elements other than the ones described below:
    The card has a holographic foil sheen effect on the borders. High-contrast blocky text with a neutral palette that is neutral and can be changed. Centered on a clean white background, 4k resolution, sharp pixel edges.`

    // `A retro-style carnival ticket sticker of a horizontal ticket layout, featuring a character with man with dark skin, a large black afro with styles for the 8bit sprite: Undertale, Mario, 8bit Pokemon etc.
    // The character has simple, minimalist design, with minimal pixels, 8bit sprite with a limited color palette and is an APPROXIMATION of the ${artist}. DO NOT MAKE IT HYPER REALISTIC. The sprite should be a SIMPLE APPROXIMATION - ONLY MAIN FEATURES. 
    // USE AS LESS PIXELS AS POSSIBLE.
    // Then to the right, add text reading "${concert}" at the top, "${artist}" beneath that, "Section: ${section}" below the artist, and "Date: ${date}" at the bottom in vintage font with no spelling errors, and a
    // color palette of **just** black background with white and red text. Include the classic XO Weeknd Logo in the ticket and make this logo small. The design should have bold, clean outlines and simple cel-shading.`
    
    //console.log("context set")
    //console.log(contents)

    const response = await fal.subscribe("fal-ai/nano-banana-pro", {
      input: {
        prompt: contents,
        aspect_ratio: "9:16",
        sync_mode: true, // This is your GDPR shield!,
        enable_web_search: true
       },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message);
        }
      },
    });
    // console.log(response.data);
    // console.log(response.data.images[0]);
    // //console.log(response.requestId);
    // console.log(response);

    // 3. Forward the image data and the correct 'Content-Type' (image/png, etc.)
    // Return the Base64 image data directly
    // const image = response.data.images[0];

    // return Response.json({ 
    //   base64: image.file_data, 
    //   type: image.content_type 
    // });

    return NextResponse.json(response.data.images[0]);

  } catch (e: unknown) {
    //console.log(e);
    if (e instanceof Error) {
      return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
    }
  }
}
