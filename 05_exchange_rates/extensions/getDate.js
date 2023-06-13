export const getDate = () => {
    let date = new Date(Date.now());
    let dateString = date.toLocaleString('uk-UA');

    return dateString;
}