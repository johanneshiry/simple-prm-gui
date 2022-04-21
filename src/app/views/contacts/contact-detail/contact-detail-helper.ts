import { VCard4 } from "vcard4-ts/src/vcard4Types";

export class ContactDetailHelper {
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
}
