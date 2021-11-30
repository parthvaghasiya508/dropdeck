export const ASPECT_RATIOS = {
  "4x3": 4 / 3,
  "16x10": 16 / 10,
  "16x9": 16 / 9
};

export const DEFAULT_ASPECT_RATIO = "16x10";

export class Presentation {
  constructor(id, identifiers, owner, name, theme, branding, coverId, readOnly, permissions, aspect, settings = {}) {
    this.id = id;
    this.identifiers = identifiers;
    this.owner = owner;
    this.name = name;
    this.theme = theme;
    this.branding = branding;
    this.coverId = coverId;
    this.readOnly = readOnly || false;
    this.permissions = permissions;
    this.aspect = aspect || DEFAULT_ASPECT_RATIO;
    this.settings = settings;
  }

  static fromDataObject = (data) => (data !== undefined ? new Presentation(
    data._id,
    data.identifiers,
    data.owner,
    data.name,
    data.theme,
    data.branding,
    data.coverId,
    data.readOnly,
    data.permissions,
    data.aspect,
    data.settings
  ) : undefined);

  toDataObject() {
    return {
      _id: this.id,
      identifiers: this.identifiers,
      owner: this.owner,
      name: this.name,
      theme: this.theme,
      branding: this.branding,
      coverId: this.coverId,
      readOnly: this.readOnly || false,
      permissions: this.permissions,
      aspect: this.aspect,
      settings: this.settings
    };
  }

}

export class Deck extends Presentation {

  constructor(id, identifiers, owner, name, theme, branding, content, coverId, readOnly, permissions, aspect, settings = {}) {
    super(id, identifiers, owner, name, theme, branding, coverId, readOnly, permissions, aspect, settings);
    this.content = content;
  }

  toDataObject() {
    const obj = super.toDataObject();
    obj.content = this.content !== undefined ? this.content : [];
  }

  static fromDataObject = (data) => (data !== undefined ? new Deck(
    data._id,
    data.identifiers,
    data.owner,
    data.name,
    data.theme,
    data.branding,
    data.content !== undefined && data.content !== null ? data.content : [],
    data.coverId,
    data.readOnly,
    data.permissions,
    data.aspect,
    data.settings
  ) : undefined);
}
