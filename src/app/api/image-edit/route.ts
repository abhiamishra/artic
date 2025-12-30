import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_API_KEY
});

export async function POST(req: NextRequest) {
  try {
    const { tradingcardURL, albumURL } = await req.json();

    const contents = 
    `STEP ONE: Convert this image of the album cover (second image) into a 16bit pixel-art and place it inside the top window of the generated concert ticket trading card (1st image). 
    
    You may expand the picture to fill up the space. Do not however mix and add any new landscape.
    
    \n\nSTEP TWO: Edit the colors of the concert trading card UI layout at the bottom to have the same color palette theme as the cover art image. The background colors of the bottom UI part must be changed based on the colors of the cover art album.
    
    The end result is that new trading card must not be like the original and it must feel like it's from the album.

    If there album cover has a specific font style, change the font of the text so it matches that album font.
    
    \n\nSTEP THREE: Do not add add anything or edit anything else. 
    
    Ensure that all lettering is visible and there is no dark lettering over dark background. There is no white lettering over white background.
    Don't add anything around the card. Keep the outside of the card white for easy cropping.
    `

    // console.log("card url: ", tradingcardURL);
    // console.log("card url hosted: ", hostedBaseImage);

    const modAlbumURL = albumURL.results[0].artworkUrl100.replace('100x100', '600x600');

    // console.log("album url: ", modAlbumURL);

      
    const response = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
      input: {
        prompt: contents,
        image_urls: [tradingcardURL, modAlbumURL],
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

    return NextResponse.json(response.data.images[0]);

  } catch (e: unknown) {
    //console.log(e);
    if (e instanceof Error) {
      return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
    }
  }
}
