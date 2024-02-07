import { useState } from "react";
import { FlatList, View } from "react-native";
import { CategoryButton } from "~/components/category-button";
import { Header } from "~/components/header";
import { CATEGORIES } from "~/utils/data/products";

function Home() {

    const [category, setCategory] = useState(CATEGORIES[0]);

    function handleCategorySelect(selectedCategory: string) {
        setCategory(selectedCategory);
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Faça seu pedido" cartQuantityItems={3} />

            <FlatList
                data={CATEGORIES}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <CategoryButton
                        title={item}
                        onPress={() => handleCategorySelect(item)}
                        isSelected={item === category}
                    />
                )}
                horizontal
                className="max-h-10 mt-5"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
            />

        </View>
    );
}
export default Home;