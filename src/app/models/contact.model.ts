import { VCard4 } from "vcard4-ts/src/vcard4Types";
import { ContactDetailHelper } from "../views/contacts/contact-detail/contact-detail-helper";

export class Contact extends ContactDetailHelper {
  constructor(vCard: VCard4) {
    super();
    this._vCard = vCard;
  }

  get vCard(): VCard4 {
    return this._vCard;
  }

  private readonly _vCard: VCard4;

  get uid() {
    return this._vCard.UID!.value;
  }

  get fn() {
    return this.vCard.FN[0].value;
  }

  get initials() {
    return this.getInitials(this._vCard);
  }

  get photoSrc() {
    return this.photoSrcString(this._vCard);
  }

  get photoBackgroundUrl() {
    let photoSrc = this.photoSrc;
    if (photoSrc != undefined) {
      return `url(${this.photoSrc})`;
    } else return photoSrc;
  }

  get age() {
    return this.calculateAge(this._vCard);
  }

  get addresses() {
    return this._vCard.ADR?.map((adr) => {
      return {
        type: this.wordToLowerCaseExceptFirstChar(adr.parameters?.TYPE?.[0]),
        street: adr.value.streetAddress?.[0],
        postalCode: adr.value.postalCode?.[0],
        location: adr.value.locality?.[0],
      };
    });
  }

  get emails() {
    return this._vCard.EMAIL?.map((email) => {
      return {
        type: this.wordToLowerCaseExceptFirstChar(this.eMailType(email)),
        value: email.value,
      };
    });
  }

  get phones() {
    let phones = this.getPhones(this._vCard);
    if (phones.length > 0) return phones;
    return undefined;
  }
}
