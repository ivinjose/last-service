export type Service = {
    amount: string;
    comments: string;
    component: string;
    date: string;
    user: string;
    vehicle: string;
    kmsReading?: string;
    _id?: string;
};

export type Vehicle = {
    _id?: string;
    user: string;
    name: string;
    type: string;
};

export type User = {
    _id: string;
    googleId: string;
    displayName: string;
    email: string;
    photo: string;
};

export type AppState = {
    user: {
        _id: string;
        displayName: string;
        email: string;
        googleId: string;
        photo: string;
    };
    vehicles: Vehicle[];
    services: Service[];
    ui: {
        showPageBlockingLoader: boolean;
        showPlaceholderLoader: boolean;
        snackbarMessage: string;
    };
};
