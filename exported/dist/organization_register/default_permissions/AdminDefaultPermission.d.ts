export declare const adminDefaultPermission: ({
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
        import: boolean;
        angularPermissions: {
            CanUserEditPermissionsOfSameRole: boolean;
            canUserViewSubscriptionDetails: boolean;
        };
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        export: boolean;
        import: boolean;
        angularPermissions?: undefined;
    } | {
        moduleName: string;
        view: boolean;
        fullaccess?: undefined;
        create?: undefined;
        edit?: undefined;
        delete?: undefined;
        export?: undefined;
        import?: undefined;
        angularPermissions?: undefined;
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
        import?: undefined;
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        export: boolean;
        import: boolean;
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
        export: boolean;
        import: boolean;
        angularPermissions?: undefined;
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        export: boolean;
        import: boolean;
        angularPermissions: {
            canUserReturnAsset: boolean;
            canUserViewOtherStaffProfile?: undefined;
            canUserMapAssetToAsset?: undefined;
            canUserMapFieldsToItems?: undefined;
        };
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        export: boolean;
        import: boolean;
        angularPermissions: {
            canUserViewOtherStaffProfile: boolean;
            canUserReturnAsset?: undefined;
            canUserMapAssetToAsset?: undefined;
            canUserMapFieldsToItems?: undefined;
        };
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        export: boolean;
        import: boolean;
        angularPermissions: {
            canUserMapAssetToAsset: boolean;
            canUserReturnAsset?: undefined;
            canUserViewOtherStaffProfile?: undefined;
            canUserMapFieldsToItems?: undefined;
        };
    } | {
        moduleName: string;
        fullaccess: boolean;
        create: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        export: boolean;
        import: boolean;
        angularPermissions: {
            canUserMapFieldsToItems: boolean;
            canUserReturnAsset?: undefined;
            canUserViewOtherStaffProfile?: undefined;
            canUserMapAssetToAsset?: undefined;
        };
    })[];
})[];
