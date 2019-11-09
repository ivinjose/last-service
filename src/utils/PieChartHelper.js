const mapData = data =>
    data
        .map(({ amount, component }) => {
            return {
                name: component,
                value: !isNaN(parseInt(amount)) ? parseInt(amount) : 100, // FIXME: no need to check if data is in valid format
            };
        })
        .sort(({ value: a }, { value: b }) => {
            return b - a;
        });

export default mapData;
