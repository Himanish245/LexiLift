import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { _type } = body;

    // Revalidate based on content type
    switch (_type) {
      case "homePage":
      case "siteSettings":
        revalidatePath("/", "page");
        break;
      case "pricingPage":
        revalidatePath("/pricing", "page");
        break;
      case "aboutPage":
      case "teamMember":
        revalidatePath("/about", "page");
        break;
      case "contactPage":
        revalidatePath("/contact", "page");
        break;
      case "blogPost":
      case "author":
      case "category":
        revalidatePath("/blog", "page");
        // Also revalidate individual post if slug is available
        if (body.slug?.current) {
          revalidatePath(`/blog/${body.slug.current}`, "page");
        }
        break;
      default:
        revalidatePath("/", "layout");
    }

    return NextResponse.json({ revalidated: true, type: _type });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error },
      { status: 500 }
    );
  }
}
