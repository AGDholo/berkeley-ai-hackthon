import {FC, useEffect, useState} from 'react';

// 定义餐厅信息的类型
interface Restaurant {
    url: string;
    name: string;
    snippet: string;
}

// 定义组件的 props 类型
interface SearchListProps {
    search: string;
}


const SearchList: FC<SearchListProps> = ({search}) => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        // 解析 search 字段的 JSON 字符串
        try {
            const searchObj = JSON.parse(search);
            if (searchObj && searchObj.search_results) {
                setRestaurants(searchObj.search_results as Restaurant[]);
            }
        } catch (error) {
            console.error('Failed to parse search JSON:', error);
        }
    }, [search]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Restaurants Near by you</h2>
            <ul className="space-y-4">
                {restaurants.map((restaurant, index) => index < 5 && (
                    <li key={index}
                        className="p-4 border border-gray-300 rounded-lg shadow-lg">
                        <a href={restaurant.url}
                           className="text-lg font-semibold text-blue-600 hover:underline">
                            {restaurant.name}
                        </a>
                        <p className="text-gray-600">{restaurant.snippet}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchList;
