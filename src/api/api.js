const CATEGORY_URL =
  "https://api-dev.shop-delivery.ru/int_api/ozon/v3/category/attribute";
const COLLECTION_URL =
  "https://api-dev.shop-delivery.ru/int_api/ozon/v2/category/attribute/values";

export async function getAttributes(category) {
  let bodyObj = {
    attribute_type: "ALL",
    category_id: [category],
    language: "DEFAULT",
  };
  try {
    let response = await fetch(CATEGORY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(bodyObj),
    });
    let data = await response.json();
    if(response.status>= 400 && response.status<= 599) throw new Error(`Http exeption code: ${response.status}`)
    return data.result[0].attributes;
  } catch (err) {
    console.log("error =>", err.name);
    return {};
  }
}

export async function getCollection(
  category,
  id,
  last_value_id = 0,
  limit = 20,
  query = ""
) {
  let collectionObj = {
    attribute_id: id,
    category_id: category,
    language: "DEFAULT",
    last_value_id: last_value_id,
    limit: limit,
    query: query,
  };
  try {
    let res = await fetch(COLLECTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(collectionObj),
    });
    if(res.status>= 400 && res.status<= 599) throw new Error(`Http exeption code: ${res.status}`)
    let collection = await res.json();
    return collection
  } catch (err) {
    console.log("error =>", err.message);
    return null;
  }
}
