import { VCard4 } from "vcard4-ts/src/vcard4Types";
import { ApiContact } from "../../../models/api/api-contact.model";
import { parseVCards, SingleVCardProperty } from "vcard4-ts";
import { Contact } from "../../../models/contact.model";

export class ContactDetailHelper {
  static fromApiContact(apiContact: ApiContact) {
    let maybeVCard = Contact.validate(apiContact.vCard);
    if (maybeVCard instanceof Error || maybeVCard.UID === undefined) {
      console.error(
        "Cannot create instance of contact! Error: " +
          (<Error>maybeVCard).message
      );
      throw maybeVCard;
    } else if (apiContact.uid != maybeVCard.UID.value) {
      throw Error(
        "Provided uid '" +
          apiContact.uid +
          "' does not match uid in vCard string '" +
          maybeVCard.UID.value +
          "'!"
      );
    } else {
      return new Contact(maybeVCard);
    }
  }

  private static validate(vCard: string): VCard4 | Error {
    const vCards = parseVCards(vCard).vCards;
    if (vCards) {
      if (vCards.length > 1 || vCards.length == 0) {
        return Error("Multiple vCards per contact are not supported!");
      } else {
        return vCards[0];
      }
    } else {
      return Error("Cannot parse vCard string with content '" + vCard + "'!");
    }
  }

  protected calculateAge(vCard: VCard4) {
    if (vCard.BDAY?.value !== undefined) {
      let today = new Date();
      let birthDate = new Date(vCard.BDAY.value);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } else {
      return undefined;
    }
  }

  private static toBase64SrcString(vCard: VCard4) {
    if (
      vCard.PHOTO !== undefined &&
      vCard.PHOTO!.length > 0 &&
      vCard.PHOTO[0].parameters !== undefined &&
      vCard.PHOTO[0].parameters.TYPE !== undefined
    ) {
      return `data:image/${vCard.PHOTO[0].parameters.TYPE[0]};base64,${vCard.PHOTO[0].value}`;
    } else return undefined;
  }

  protected photoSrcString(vCard: VCard4) {
    return ContactDetailHelper.toBase64SrcString(vCard);
  }

  protected getInitials(vCard: VCard4) {
    let names = vCard.FN[0].value.split(" ");
    return `${[names[0][0], names[1]?.[0]].join("")}`;
  }

  protected wordToLowerCaseExceptFirstChar(word: string | undefined) {
    // word?.charAt(0).toUpperCase() + word?.substring(1).toLowerCase();
    return word?.replace(
      /\S*/g,
      (word) => `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`
    );
  }

  protected eMailType(email: SingleVCardProperty<string>) {
    let eMailType = email.parameters?.TYPE?.filter(
      (types) => !types.includes("INTERNET")
    )[0];
    if (eMailType != undefined) {
      return eMailType;
    }
    return "INTERNET";
  }

  protected getPhones(vCard: VCard4): { type: string; number: string }[] {
    // filter fax
    let phones = vCard.TEL?.filter((tel) => this.filterPhones(tel));

    // zip unknown with X_ABLABEL
    // order normally matches
    let customLabelPhones: { type: string; number: string }[] | undefined =
      this.zip(
        phones?.filter((phone) => this.phoneType(phone) == "Unknown"),
        vCard.x?.["X_ABLABEL"]
      )?.map(([phoneNumber, label]) => {
        return {
          type: label.value,
          number: phoneNumber.value,
        };
      });

    let defaultLabelPhones: { type: string; number: string }[] | undefined =
      phones
        ?.filter((phone) => this.phoneType(phone) != "Unknown")
        .map((phone) => {
          let lowerCaseWord = this.wordToLowerCaseExceptFirstChar(
            this.phoneType(phone)
          );
          if (lowerCaseWord != undefined) {
            return {
              type: lowerCaseWord,
              number: phone.value,
            };
          } else {
            return {
              type: this.phoneType(phone),
              number: phone.value,
            };
          }
        });
    return [...(defaultLabelPhones || []), ...(customLabelPhones || [])];
  }

  protected zip(
    a: SingleVCardProperty<string>[] | undefined,
    b: SingleVCardProperty<string>[] | undefined
  ) {
    if (a != undefined && b != undefined) {
      return a.map(function (e, i) {
        return [e, b[i]];
      });
    } else {
      return undefined;
    }
  }

  protected phoneType(phone: SingleVCardProperty<string>): string {
    let phoneType = phone.parameters?.TYPE?.[0];
    if (phoneType != undefined) {
      return phoneType;
    }
    return "Unknown";
  }

  protected filterPhones(tel: SingleVCardProperty<string>) {
    let types = tel.parameters?.TYPE;
    if (types != undefined) {
      return !types.includes("FAX");
    } else {
      return true;
    }
  }
}
