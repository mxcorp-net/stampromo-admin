export class Menu {
    public static links: MenuItem[] = [
        {
            label: 'Dashboard',
            details: '12 New Orders',
            routerLink: 'dashboard',
            iconType: 'fi',
            iconName: 'shopping-bag'
        },
        {
            label: 'Catalogs',
            iconType: 'pg',
            iconName: 'grid_alt',
            toggle: 'open',
            submenu: [
                {
                    label: 'Products',
                    routerLink: 'catalogs/products',
                    iconType: 'letter',
                    iconName: 'pd',
                },
                {
                    label: 'Families',
                    routerLink: 'catalogs/families',
                    iconType: 'letter',
                    iconName: 'fa',
                },
                {
                    label: 'Providers',
                    routerLink: 'catalogs/providers',
                    iconType: 'letter',
                    iconName: 'pv',
                },
                {
                    label: 'Services',
                    routerLink: 'catalogs/services',
                    iconType: 'letter',
                    iconName: 'se',
                },
                {
                    label: 'Tags',
                    routerLink: 'catalogs/tags',
                    iconType: 'letter',
                    iconName: 'ta',
                },
            ]
        }
    ];
}

export class MenuItem {
    public label: string;
    public details?: string;
    public externalLink?: string;
    public iconType?: string;
    public iconName?: string;
    public toggle?: string;
    public routerLink?: string;
    public thumbNailClass?: string;
    public target?: string;
    public submenu?: MenuItem[];

}
