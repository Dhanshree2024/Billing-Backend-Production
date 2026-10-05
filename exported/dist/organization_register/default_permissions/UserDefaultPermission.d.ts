export declare const userDefaultPermission: ({
    moduleName: string;
    expanded: boolean;
    children: ({
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        export: boolean;
    } | {
        moduleName: string;
        view: boolean;
        fullaccess?: undefined;
        create?: undefined;
        edit?: undefined;
        delete?: undefined;
        export?: undefined;
    })[];
} | {
    moduleName: string;
    expanded: boolean;
    children: ({
        moduleName: string;
        fullaccess: boolean;
        view: boolean;
        edit: boolean;
        angularPermissions: {
            canUserViewSubscriptionDetails: boolean;
        };
        create?: undefined;
        delete?: undefined;
        export?: undefined;
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        angularPermissions?: undefined;
        export?: undefined;
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        export: boolean;
        angularPermissions?: undefined;
    })[];
} | {
    moduleName: string;
    expanded: boolean;
    children: ({
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        import: boolean;
        angularPermissions?: undefined;
        export?: undefined;
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        import: boolean;
        angularPermissions: {
            canUserReturnAsset: boolean;
            canUserViewOtherStaffProfile?: undefined;
            canUserMapAssetToAsset?: undefined;
            canUserMapFieldsToItems?: undefined;
        };
        export?: undefined;
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        import: boolean;
        angularPermissions: {
            canUserViewOtherStaffProfile: boolean;
            canUserReturnAsset?: undefined;
            canUserMapAssetToAsset?: undefined;
            canUserMapFieldsToItems?: undefined;
        };
        export?: undefined;
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        export: boolean;
        angularPermissions: {
            canUserMapAssetToAsset: boolean;
            canUserReturnAsset?: undefined;
            canUserViewOtherStaffProfile?: undefined;
            canUserMapFieldsToItems?: undefined;
        };
        import?: undefined;
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        angularPermissions: {
            canUserMapFieldsToItems: boolean;
            canUserReturnAsset?: undefined;
            canUserViewOtherStaffProfile?: undefined;
            canUserMapAssetToAsset?: undefined;
        };
        import?: undefined;
        export?: undefined;
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        export: boolean;
        import?: undefined;
        angularPermissions?: undefined;
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        import?: undefined;
        angularPermissions?: undefined;
        export?: undefined;
    })[];
})[];
