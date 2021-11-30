import ParagraphComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/ParagraphComponentPlugin";
import HeadingOneComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/HeadingOneComponentPlugin";
import HeadingTwoComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/HeadingTwoComponentPlugin";
import BlockQuoteComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/BlockQuoteComponentPlugin";
import BulletedListComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/list/bulleted/BulletedListComponentPlugin";
import NumberedListComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/NumberedListComponentPlugin";
import CodeComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/code/CodeComponentPlugin";
import MathComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/math/MathComponentPlugin";
import ImageComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/ImageComponentPlugin";
import GiphyComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/media/giphy/GiphyComponentPlugin";
import VideoComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/media/video/VideoComponentPlugin";
import LogoListComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logoList/LogoListComponentPlugin";
import LogoComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logo/LogoComponentPlugin";
import TableComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/table/TableComponentPlugin";
import PieChartComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/chart/pie/PieChartComponentPlugin";
import BarChartComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/chart/simple/bar/BarChartComponentPlugin";
import ColumnChartComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/chart/simple/column/ColumnChartComponentPlugin";
import LineChartComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/chart/simple/line/LineChartComponentPlugin";
import SunburstChartComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/chart/sunburst/SunburstChartComponentPlugin";
import { tutorialHelperSuggestion } from "../../../modules/presenter/components/Lightbox/components/TutorialHelper";
import GroupPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/groups/components/group/GroupPlugin";
import GroupCollectionPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/groups/GroupCollectionPlugin";
import LinkComponentPlugin
  from "../../../modules/composer/components/DeckEditor/modules/plugins/component/link/LinkComponentPlugin";

/**
 * Entry point for registering and initiating component plugins.
 */
export default class ComponentFactory {

  static install = (service) => {

    // Tutorial link
    service.install(tutorialHelperSuggestion());

    // Collections
    service.install(new GroupCollectionPlugin());
    service.install(new GroupPlugin());

    // Text components
    service.install(new ParagraphComponentPlugin());
    service.install(new LinkComponentPlugin());
    service.install(new HeadingOneComponentPlugin());
    service.install(new HeadingTwoComponentPlugin());
    service.install(new BlockQuoteComponentPlugin());
    service.install(new BulletedListComponentPlugin());
    service.install(new NumberedListComponentPlugin());
    service.install(new CodeComponentPlugin());
    service.install(new MathComponentPlugin());

    // Media components
    service.install(new ImageComponentPlugin());
    service.install(new GiphyComponentPlugin());
    service.install(new VideoComponentPlugin());
    service.install(new LogoListComponentPlugin());
    service.install(new LogoComponentPlugin());
    service.install(new TableComponentPlugin());

    // MapPlugin());
    // VennDiagramPlugin());

    // Chart components
    service.install(new PieChartComponentPlugin());
    service.install(new BarChartComponentPlugin());
    service.install(new ColumnChartComponentPlugin());
    service.install(new LineChartComponentPlugin());
    service.install(new SunburstChartComponentPlugin());

    return service;
  }
}
