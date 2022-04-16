import {parseVCards} from 'vcard4-ts';
import {VCard4} from "vcard4-ts/src/vcard4Types";
import {ApiContact} from "./api-contact.model";

export class Contact {
    get vCard(): VCard4 {
        return this._vCard;
    }
    private readonly _vCard: VCard4;

    get uid() {
        return this._vCard.UID!.value
    }

    constructor(apiContact: ApiContact) {
        let maybeVCard = Contact.validate(apiContact.vCard)
        if (maybeVCard instanceof Error || maybeVCard.UID === undefined) {
            console.error("Cannot create instance of contact! Error:" + (<Error>maybeVCard).message)
            throw maybeVCard
        } else if (apiContact.uid != maybeVCard.UID.value) {
            throw Error("Provided uid '" + apiContact.uid + "' does not match uid in vCard string '" + maybeVCard.UID.value + "'!")
        } else {
            this._vCard = maybeVCard
        }
    }


    private static validate(vCard: string): VCard4 | Error {
        const vCards = parseVCards(vCard).vCards
        if (vCards) {
            if (vCards.length > 1 || vCards.length == 0) {
                return Error('Multiple vCards per contact are not supported!')
            } else {
                return vCards[0]
            }
        } else {
            return Error('Cannot parse vCard string with content \'' + vCard + '\'!')
        }
    }
}