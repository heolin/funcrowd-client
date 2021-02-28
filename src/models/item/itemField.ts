import ItemTemplateField from "./itemTemplateField";

export default class ItemField {
    private _source: Nullable<ItemField> = undefined;

    constructor(readonly template: ItemTemplateField,
                readonly value: any) {}

    setSource(source: ItemField): void {
        this._source = source;
    }

    get source(): Nullable<ItemField> {
        return this._source;
    }

    get name(): string {
        return this.template.name;
    }
}
