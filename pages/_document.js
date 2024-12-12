import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Choose an Apple Watch and case. Pair any band. Express your style with a variety of colors, finishes, and materials in the Apple Watch Studio."
        />
        <meta
          property="og:description"
          content="Choose an Apple Watch and case. Pair any band. Express your style with a variety of colors, finishes, and materials in the Apple Watch Studio."
        />
        <meta name="author" content="Apple Inc" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <meta
          property="og:image"
          content="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-aws-og-202409?wid=1200&amp;hei=630&amp;fmt=jpeg&amp;qlt=95&amp;.v=1725565694226"
        />
        <link
          rel="icon"
          href="https://design-foundations.com/cdn-cgi/image/width=180,format=auto,metadata=none,fit=contain,height=180,quality=90/https://media.design-foundations.com/upscaled-favicons/www-apple-com.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
