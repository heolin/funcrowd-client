

export interface IItemTemplateField {
    id: number,
    name: string,
    label: string,
    editable: boolean,
    required: boolean,
    dataSource: string,
    widget: string,
    feedback: boolean
}


export default class ItemTemplateField implements IItemTemplateField {
    constructor(public id: number, public name: string, public label: string,
                public editable: boolean, public required: boolean,
                public dataSource: string, public widget: string, public feedback: boolean) {}

    static fromJson(data: IItemTemplateField) {
        return new ItemTemplateField(
            data.id,
            data.name,
            data.label,
            data.editable,
            data.required,
            data.dataSource,
            data.widget,
            data.feedback
        );
    }
}
