import React, {useEffect, useState} from 'react';
import Pie from "@/components/Pie.tsx";

type NutritionNeeding = {
    BMI: number;
    calorie: number;
    water: number;
    protein: number;
    carbohydrates: number;
    cholesterol: number;
    fibroid: number;
    Sodium: number;
    Zinc: number;
    Copper: number;
    Manganese: number;
    Selenium: number;
    VitaminA: number;
    VitaminC: number;
    VitaminD: number;
    VitaminE: number;
    VitaminK: number;
    Thiamin: number;
    VitamnB12: number;
};

type MealNutrition = {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
};

type Meal = {
    food_name: string;
    calories: number;
    water: number;
    protein: number;
    carbohydrates: number;
    cholesterol: number;
    fibroid: number;
    sodium: number;
    zinc: number;
    copper: number;
    manganese: number;
    selenium: number;
    vitaminA: number;
    vitaminC: number;
    vitaminD: number;
    vitaminE: number;
    vitaminK: number;
    thiamin: number;
    vitaminB12: number;
};

type NutritionInfoProps = {
    data: {
        showBars?: boolean;
        nutrition_needing: NutritionNeeding;
        meal_nutrition: string; // JSON string that needs parsing
    };
};

const NutritionInfo: React.FC<NutritionInfoProps> = ({data}) => {
    const [parsedMealNutrition, setParsedMealNutrition] = useState<MealNutrition | null>(null);

    useEffect(() => {
        try {
            // 去掉换行符和多余的转义字符，得到有效的 JSON 字符串
            const cleanedData = data.meal_nutrition.replace(/\\n/g, '').replace(/\\\//g, '/');
            // 解析为对象
            const parsedData = JSON.parse(cleanedData);
            setParsedMealNutrition(parsedData);
        } catch (error) {
            console.error("Failed to parse meal nutrition data:", error);
        }
    }, [data.meal_nutrition]);

    if (!parsedMealNutrition) return <div>Loading...</div>;

    return (
        <div>
            <Pie data={{
                showBars: data.showBars,
                nutrition_needing: data.nutrition_needing,
                meal_nutrition: parsedMealNutrition
            }}/>
        </div>
    );
};

export default NutritionInfo;
