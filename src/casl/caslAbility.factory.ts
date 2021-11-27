import { User } from "../users/user.entity";
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects
} from "@casl/ability";
import { Review } from "../reviews/review.entity";
import { Injectable } from "@nestjs/common";
import { Action } from "./model/action";

type Reviews = InferSubjects<typeof Review | typeof User> | "all";

export type AppAbility = Ability<[Action, Reviews]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Reviews]>>(
      Ability as AbilityClass<AppAbility>
    );

    can(Action.Update, Review, { userId: user.id });
    can(Action.Delete, Review, { userId: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Reviews>
    });
  }
}
