import ItemTemplate, { IItemTemplate } from "./itemTemplate";
import ItemField from "./itemField";


export interface IItem {
    id: number,
    taskId: number,
    data: Record<string, any>,
    template: IItemTemplate,
    exp: number
}


export default class Item implements IItem {
    readonly fields: Map<string, ItemField>;

    constructor(public id: number, public taskId: number, public data: Record<string, any>,
                public template: IItemTemplate, public exp: number) {

        this.fields = new Map<string, ItemField>();
        this._initializeFields();
    }

    private _initializeFields(): void {
        // initialize fields
        this.template.fields.map((field) => {

            this.fields.set(
                field.name,
                new ItemField(
                    field,
                    this.data[field.name]
                )
            );
        });

        // connect data sources
        this.fields.forEach((field: ItemField, key: string) => {
            if (field.template.dataSource) {
                let sourceField = this.fields.get(field.template.dataSource);
                if (sourceField)
                    field.setSource(sourceField);
            }
        });
    }

    get inputFields(): ItemField[] {
        let _fields: ItemField[] = [];
        Array.from(this.fields.values()).map((field) => {            
            if (!field.template.editable)
                _fields.push(field);
        });
        return _fields;
    }

    get outputFields(): ItemField[] {
        let _fields: ItemField[] = [];
        Array.from(this.fields.values()).map((field) => {            
            if (field.template.editable)
                _fields.push(field);
        });
        return _fields;
    }

    static fromJson(data: IItem): Nullable<Item> {
        if (data)
            return new Item(
                data.id,
                data.taskId,
                data.data,
                ItemTemplate.fromJson(data.template),
                data.exp
            );
        return undefined;
    }

    annotate() {
        
    }
}
