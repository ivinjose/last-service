const mapData = data =>
    data
        .map(({ amount, component }) => {
            return {
                name: component,
                value: !isNaN(parseInt(amount)) ? parseInt(amount) : 100,
            };
        })
        .sort(({ value: a }, { value: b }) => {
            return b - a;
        });

export default mapData;
