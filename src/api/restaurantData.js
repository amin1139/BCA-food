
export const getResData = async () => {
    const rawdata = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.4281881&lng=81.8019227&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');

    const data = await rawdata.json();
    return data

}
