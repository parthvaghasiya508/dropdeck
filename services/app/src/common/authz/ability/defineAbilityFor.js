import { AbilityBuilder, Ability } from '@casl/ability';
import Abilities from "./Abilities";
import AnonymousUser from "../AnonymousUser";

export const defineAbilityFor = (user) => {

  const { can, cannot, build } = new AbilityBuilder(Ability);

  can(Abilities.Actions.VIEW, Abilities.Subjects.DECK);
  can(Abilities.Actions.VIEW, Abilities.Subjects.PRESENTATION);

  if (user instanceof AnonymousUser) {

    // Anonymous users can't change sharing settings.
    cannot(Abilities.Actions.SET_PERMISSIONS, Abilities.Subjects.DECK);
    cannot(Abilities.Actions.SET_PERMISSIONS, Abilities.Subjects.PRESENTATION);

    const anonymousDecks = user.getDecks();
    if (anonymousDecks && Array.isArray(anonymousDecks) && anonymousDecks.length > 0) {

      // An anonymous user can only edit an unclaimed deck which the user created.
      anonymousDecks.forEach((id) => {
        can(Abilities.Actions.EDIT, Abilities.Subjects.DECK, { owner: null, id });
        can(Abilities.Actions.EDIT, Abilities.Subjects.PRESENTATION, { owner: null, id });
        can(Abilities.Actions.DELETE, Abilities.Subjects.DECK, { owner: null, id });
        can(Abilities.Actions.DELETE, Abilities.Subjects.PRESENTATION, { owner: null, id });
      });

    } else {

      // No anonymous decks for this anonymous user => the user can't change anything.
      cannot(Abilities.Actions.EDIT, Abilities.Subjects.DECK);
      cannot(Abilities.Actions.EDIT, Abilities.Subjects.PRESENTATION);
      cannot(Abilities.Actions.DELETE, Abilities.Subjects.DECK);
      cannot(Abilities.Actions.DELETE, Abilities.Subjects.PRESENTATION);
    }

  } else {

    // Only owners can edit their own decks.
    can(Abilities.Actions.EDIT, Abilities.Subjects.DECK, { 'owner._id': user._id });
    can(Abilities.Actions.EDIT, Abilities.Subjects.PRESENTATION, { 'owner._id': user._id });

    // Only owners can change sharing permissions.
    can(Abilities.Actions.SET_PERMISSIONS, Abilities.Subjects.DECK, { 'owner._id': user._id });
    can(Abilities.Actions.SET_PERMISSIONS, Abilities.Subjects.PRESENTATION, { 'owner._id': user._id });

    // Only owners can delete their own decks
    can(Abilities.Actions.DELETE, Abilities.Subjects.DECK, { 'owner._id': user._id });
    can(Abilities.Actions.DELETE, Abilities.Subjects.PRESENTATION, { 'owner._id': user._id });

  }

  // No-one can edit an explicitly read-only deck.
  cannot(Abilities.Actions.EDIT, Abilities.Subjects.DECK, { readOnly: true });
  cannot(Abilities.Actions.EDIT, Abilities.Subjects.PRESENTATION, { readOnly: true });

  return build();
};
