import { ExpansionPanelActions } from '@material-ui/core';
import { ItalicPlugin } from '@udecode/slate-plugins';
import { slideTransitionClass } from './slideTransitionClass';

describe("slide trasition class test", () => {
  it("slideTransitionClass before first slide for col 2",() => {
    const cols = 2;
    const dropZoneIndex = 0;
    const index = 2;
    const slides = [1,2,3];
    const dropZonePosition = 0;
    const result = { slideTransitionClass: 'selectwidget-right-2x', selectWidgetPosition: "left" };
    expect(slideTransitionClass(dropZoneIndex, cols, slides, dropZonePosition, index)).toEqual(result);
  });

  it("slideTransitionClass in between slides for col 2",() => {
    const cols = 2;
    const dropZoneIndex = 1;
    const index = 2;
    const slides = [1,2,3];
    const dropZonePosition = 1;
    const result = { slideTransitionClass: 'selectwidget-right', selectWidgetPosition: "between" };
    expect(slideTransitionClass(dropZoneIndex, cols, slides, dropZonePosition, index)).toEqual(result);
  });

  it("slideTransitionClass rightmost side for col 2",() => {
    const cols = 2;
    const dropZoneIndex = 2;
    const index = 4;
    const slides = [1,2,3,4,5];
    const dropZonePosition = 2;
    const result = { slideTransitionClass: '', selectWidgetPosition: "right" };
    expect(slideTransitionClass(dropZoneIndex, cols, slides, dropZonePosition, index)).toEqual(result);
  });
  it("selectWidgetPosition left for col 2",() => {
    const cols = 2;
    const dropZoneIndex = 4;
    const index = 4;
    const slides = [1,2,3,4,5];
    const dropZonePosition = 6;
    const result = { slideTransitionClass: '', selectWidgetPosition: "left" };
    expect(slideTransitionClass(dropZoneIndex, cols, slides, dropZonePosition, index)).toEqual(result);
  });
  it("slideTransitionClass selectWidget-bottom for col 1",() => {
    const cols = 1;
    const dropZoneIndex = 2;
    const index = 4;
    const slides = [1,2,3,4,5];
    const dropZonePosition = 8;
    const result = { slideTransitionClass: 'selectwidget-bottom', selectWidgetPosition: "" };
    expect(slideTransitionClass(dropZoneIndex, cols, slides, dropZonePosition, index)).toEqual(result);
  });
  it("slideTransitionClass in between slide for col 1",() => {
    const cols = 1;
    const dropZoneIndex = 4;
    const index = 2;
    const slides = [1,2,3,4,5];
    const dropZonePosition = 6;
    const result = { slideTransitionClass: 'selectwidget-top', selectWidgetPosition: "" };
    expect(slideTransitionClass(dropZoneIndex, cols, slides, dropZonePosition, index)).toEqual(result);
  });
  it("Returns selectWidgetPosition empty for col 1",() => {
    const cols = 1;
    const dropZoneIndex = 4;
    const index = 4;
    const slides = [1,2,3,4,5];
    const dropZonePosition = 8;
    const result = { slideTransitionClass: '', selectWidgetPosition: "" };
    expect(slideTransitionClass(dropZoneIndex, cols, slides, dropZonePosition, index)).toEqual(result);
  });
  it("selectWidgetPosition for cols 3 before First Slide",() => {
    const cols = 3;
    const dropZoneIndex = 0;
    const index = 4;
    const slides = [1,2,3,4,5];
    const dropZonePosition = 0;
    const result = { slideTransitionClass: '', selectWidgetPosition: "left" };
    expect(slideTransitionClass(dropZoneIndex, cols, slides, dropZonePosition, index)).toEqual(result);
  });
  it("slideTrasisiotnClass in between slides for col 3 ",() => {
    const cols = 3;
    const dropZoneIndex = 3;
    const index = 2;
    const slides = [1,2,3,4,5];
    const dropZonePosition = 1;
    const result = { slideTransitionClass: 'selectwidget-left', selectWidgetPosition: "between" };
    expect(slideTransitionClass(dropZoneIndex, cols, slides, dropZonePosition, index)).toEqual(result);
  });
  it("Returns selectWidgetPosition empty",() => {
    const cols = 3;
    const dropZoneIndex = 4;
    const index = 4;
    const slides = [1,2,3,4,5];
    const dropZonePosition = 5;
    const result = { slideTransitionClass: 'selectwidget-last', selectWidgetPosition: "last" };
    expect(slideTransitionClass(dropZoneIndex, cols, slides, dropZonePosition, index)).toEqual(result);
  });

});
