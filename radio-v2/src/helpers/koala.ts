
//Utility function to change dates from activities to actual Date objects
function formatActivity(activity: any) {
    return {
        ...activity,
        has_start_time: activity.start_date.indexOf('T') > -1,
        has_end_time: activity.end_date && activity.end_date.indexOf('T') > -1,
        start_date: new Date(activity.start_date),
        end_date: activity.end_date ? new Date(activity.end_date) : null
    }
}

export async function getActivities() {
    const ACTIVITY_ENDPOINT = String(process.env.NEXT_PUBLIC_ACTIVITY_ENDPOINT)
    const activities = await fetch(ACTIVITY_ENDPOINT).then(res => {
        console.log(res);
        return res.json()
    });

    // Fix activity dates and sort them on start_date and make sure it has a poster
    return activities.map(formatActivity)
        .sort((a: any, b: any) => a.start_date - b.start_date)
        .filter(act => act.poster)








}