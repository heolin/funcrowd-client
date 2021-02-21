import ItemTemplateField, { IItemTemplateField } from "./itemTemplateField";


export interface IItemTemplate {
    id: number,
    name: string,
    fields: IItemTemplateField[]
}


export default class ItemTemplate implements IItemTemplate {
    constructor(public id: number, public name: string,
                public fields: IItemTemplateField[]) {}

    static fromJson(data: IItemTemplate) {
        let fields = data.fields.map((field) => ItemTemplateField.fromJson(field));

        return new ItemTemplate(
            data.id,
            data.name,
            fields
        );
    }
}
