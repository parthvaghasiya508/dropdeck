/**
 * Entry point for registering and initiating slide templates.
 */
import { codeTemplate } from "./library/codeSlideTemplate";
import { mathFormulaTemplate } from "./library/mathFormulaSlideTemplate";
import { textImages3070SlideTemplate } from "./library/textImage2575SlideTemplate";
import { textImages5050SlideTemplate } from "./library/textImage5050SlideTemplate";
import { threeSideBySideTemplate } from "./library/threeSideBySideImagesSlideTemplate";
import { titleImageTemplate } from "./library/titleImageTemplate";
import { teamSlideTemplate } from "./library/teamSlideTemplate";
import { coverSlideTemplate } from "./library/coverSlideTemplate";
import { summarySlideTemplate } from "./library/summarySlideTemplate";
import { compareTwoSlideTemplate } from "./library/compareTwoSlideTemplate";
import { splitViewTemplate } from "./library/splitViewTemplate";
import { agendaTemplate } from "./library/agendaTemplate";
import { quoteSimpleTemplate } from "./library/quoteSimpleTemplate";
import { chart5050Template } from "./library/chart5050Template";
import { simpleTableTemplate } from "./library/simpleTableTemplate";
import { table2575Template } from "./library/table2575Template";

export default class TemplateFactory {

  static install = (service) => {

    // Statement slide (hidden for now).
    // service.install(statementSlideTemplate);

    // Cover slide
    service.install(coverSlideTemplate);

    // Image and title
    service.install(titleImageTemplate);

    // Team slide
    service.install(teamSlideTemplate);

    // Three side by side with images
    service.install(threeSideBySideTemplate);

    // Side by side comparison
    service.install(compareTwoSlideTemplate);

    // Split view
    service.install(splitViewTemplate);

    // Summary slide
    service.install(summarySlideTemplate);

    // Agenda
    service.install(agendaTemplate);

    // Simple Quote
    service.install(quoteSimpleTemplate);

    // Chart
    service.install(chart5050Template);

    // Code
    service.install(codeTemplate);

    // Math formula
    service.install(mathFormulaTemplate);

    // Text/Image 50/50
    service.install(textImages5050SlideTemplate);

    // Text/Image 30/70
    service.install(textImages3070SlideTemplate);

    // Table
    service.install(simpleTableTemplate);

    // Table Img
    service.install(table2575Template);

    return service;
  }
}
