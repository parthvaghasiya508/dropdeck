import Palette from "../../../../../theme/Palette";
import { textCodeRowsRemix } from "../../../../remix/rules/text/textCodeRows/textCodeRows";
import { componentBuilder } from "../../builder/ComponentBuilder";
import { Format } from "../../builder/Format";

const builder = componentBuilder();
export const codeTemplate = () => builder
  .template({
    name: 'Code',
    remix: textCodeRowsRemix,
    // palette: new Palette("#6DFF56", "#002D0A", "#6DFF56", "#6DFF56", "#6DFF56"), // Acc. BG. H1. H2. P.
  })
  .code('case child:is_adult(State) of\n' +
    '  true ->\n' +
    '    {links, [ParentPid]} = erlang:process_info(self(), links),\n' +
    '    ParentPid ! good_bye,\n' +
    '    unlink(ParentPid),\n' +
    '    adult:live(State);\n' +
    '  false ->\n' +
    '    live(NewState)\n' +
    'end.')
  .title('Code')
  .paragraph('Code poetry intermixes notions of classical poetry and computer ', Format.code('code'), '.');
