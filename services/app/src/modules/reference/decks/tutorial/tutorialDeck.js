import { componentBuilder } from "../../../../common/api/plugins/builder/ComponentBuilder";
import { textImages5050FullBleedRemix } from "../../../../common/remix/rules/textImage/fullBleed/50-50/textImages5050FullBleed/textImages5050FullBleed";
import { Format } from "../../../../common/api/plugins/builder/Format";
import { Deck } from "../../../../common/model/Deck";
import { textDefaultRemix } from "../../../../common/remix/rules/text/textDefault/textDefault";
import { imageH1Text1005050FullBleedRemix } from "../../../../common/remix/rules/textImageCover/tic1/imageH1Text1005050FullBleed/imageH1Text1005050FullBleed";

export const tutorialDeck = () => {

  const builder = componentBuilder();
  const slides = [

    // Getting started
    builder.slide({
      remix: textImages5050FullBleedRemix.name(),
    })
      .title("Getting started with Dropdeck")
      .paragraph("If you’ve ever used a word processor, you already know how to create stunning slides in Dropdeck.")
      .paragraph(Format.bold("Think it. Type it. See it."))
      .image({ url: "/reference/tutorial/img/01.jpg" })
      .build(),

    // Suggestions
    builder.slide({
      remix: textImages5050FullBleedRemix.name(),
    })
      .title("Suggestions")
      .paragraph("Dropdeck offers useful suggestions as you type.")
      .paragraph("For example, type ", Format.code("New"), " and you’ll see the ", Format.italic("New slide"), " hint appear below your cursor.")
      .paragraph("Hit the ", Format.bold("Enter"), " key to accept, or keep typing to dismiss it.")
      .image({ url: "/reference/tutorial/img/02.jpg" })
      .build(),

    // Images
    builder.slide({
      remix: textImages5050FullBleedRemix.name(),
    })
      .title("Images")
      .paragraph(
        "Type ",
        Format.code("picture"),
        " or ",
        Format.code("image"),
        " to instantly search over a million rights cleared and free to use images. Use the ",
        Format.bold("cursor keys"),
        " to choose, then hit ",
        Format.bold("Enter"),
        " to add the images to your slide.",
      )
      .paragraph("You can also drag and drop images from your computer directly into the editor.")
      .image({ url: "/reference/tutorial/img/04.jpg" })
      .build(),

    // Adding Other Elements
    builder.slide({
      remix: textDefaultRemix.name(),
    })
      .title("Adding other elements")
      .paragraph("Use the keyboard to quickly add all kinds of different things to slides.")
      .paragraph(
        "For example, on a new line try typing ",
        Format.code("heading"),
        " or ",
        Format.code("subheading"),
        " to create a new title.",
      )
      .paragraph(
        "Type ",
        Format.code("bullet"),
        " or ",
        Format.code("number"),
        " to create a new list, ",
        Format.code("quote"), ", ", Format.code("table"), ", ", Format.code("code"),
        " or ",
        Format.code("math"),
        " to add formatted text, or ",
        Format.code("logo"),
        " to find and add a company logo."
      )
      .paragraph(
        Format.emphasis("Too much to remember?"),
        " No worries. At any point you can browse all slide elements by typing a ",
        Format.bold("forward-slash"),
        " (",
        Format.code("/"),
        ") at the start of any new line.",
      )
      .build(),

    // Slide design
    builder.slide({
      remix: imageH1Text1005050FullBleedRemix.name(),
    })
      .title("Slide design")
      .paragraph(
        "To change the layout or colors of your slides, hover over a slide preview and hit the ",
        Format.bold("Magic Wand button"),
        " to open up the remix panel...",
      )
      .image({ url: "/reference/tutorial/img/05.jpg" })
      .build(),

    // Remix
    builder.slide({
      remix: imageH1Text1005050FullBleedRemix.name(),
    })
      .title("And remix!")
      .paragraph("With the remix panel open, you can easily change up a slide’s design by choosing a layout from the available remixes.")
      .image({ url: "/reference/tutorial/img/06.jpg" })
      .build(),

    // Slide colours
    builder.slide({
      remix: imageH1Text1005050FullBleedRemix.name(),
    })
      .title("Slide colors")
      .paragraph(
        "You can also give your slides a splash of color by choosing a color palette from those available. Feeling inspired? The ",
        Format.bold("customize colors"),
        " button lets you design your own."
      )
      .image({ url: "/reference/tutorial/img/07.jpg" })
      .build(),

    // Themes
    builder.slide({
      remix: textImages5050FullBleedRemix.name(),
    })
      .title("Themes")
      .paragraph(
        "An eye‑catching theme will ensure your deck stands out from the crowd. Check out the selection of themes at any time from the Deck Sidebar.",
      )
      .paragraph(
        "If you have a branded theme associated with your account, it will also be available here.",
      )
      .image({ url: "/reference/tutorial/img/08.jpg" })
      .build(),

    // Final
    builder.slide({
      remix: textImages5050FullBleedRemix.name(),
    })
      .title("We’d love your feedback")
      .paragraph(
        "We hope you love Dropdeck. If a slide hasn’t come together in quite the way you expected, please let us know. To get in touch with us, click the ",
        Format.bold("?"),
        " button at any time."
      )
      .image({ url: "/reference/tutorial/img/09.jpg" })
      .build(),
  ];

  return Deck.fromDataObject({
    theme: "simple",
    name: "Getting started",
    _id: "tutorial",
    identifiers: {
      short: "tutorial"
    },
    content: slides,
  });

};
