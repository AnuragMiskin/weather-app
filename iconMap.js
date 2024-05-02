export const ICON_MAP = new Map()

function addmaping(values,icon){
    values.forEach(value => {
        ICON_MAP.set(value,icon)
    });
}

addmaping([0,1],"sun")
addmaping([2],"cloud-sun")
addmaping([3],"cloud")
addmaping([45,48],"smog")
addmaping(
    [51,53,55,56,57,61,63,65,66,67,80,81,82],"cloud-showers-heavy"
)
addmaping([71,73,75,77,85,86],"snowflake")
addmaping([95,96,99],"cloud-bolt")