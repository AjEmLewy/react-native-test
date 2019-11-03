export const sort_spotkanie_by_date = (firstItem, secondItem) => 
{
    return new Date(firstItem.data).getTime() - new Date(secondItem.data).getTime()
}