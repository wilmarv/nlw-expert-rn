import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "~/components/button";
import { Header } from "~/components/header";
import { Input } from "~/components/input";
import { LinkButton } from "~/components/link-button";
import { Produtc } from "~/components/product";
import { ProductCardProps, useCartStore } from "~/stores/cart-store";
import { formatCurrency } from "~/utils/functions/format-currency";

const PHONE_NUMBER = "5535987015460";

function Cart() {
    const [address, setAddress] = useState("");
    const cartStore = useCartStore();
    const navigation = useNavigation();

    const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0));

    function handleProductRemove(product: ProductCardProps) {
        Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
            {
                text: "Cancelar",
            },
            {
                text: "Remover",
                onPress: () => cartStore.remove(product.id)
            }
        ]);
    }

    function handleOrder() {
        if (address.trim().length === 0)
            return Alert.alert("Pedido", "Informe os dados da entraga.");

        const products = cartStore.products.map(product => `\n ${product.quantity} ${product.title}`).join("");

        const message = `
        NOVO PEDIDO
        \n Entregar em: ${address}
        ${products}

        \n Valor total:${total}
        `

        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`);

        cartStore.clear();
        navigation.goBack();
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho" />
            <KeyboardAwareScrollView>
                <View className="p-5 flex-1">
                    <ScrollView>
                        {cartStore.products.length > 0 ? (
                            <View className="border-b border-slate-700">
                                {
                                    cartStore.products.map(product => (
                                        <Produtc key={product.id}
                                            data={product}
                                            onPress={() => handleProductRemove(product)}
                                        />
                                    ))
                                }
                            </View>
                        ) : (
                            <Text className="font-body text-slate-400 text-center my-8">
                                Seucarrinho está vazio.
                            </Text>
                        )}

                        <View className="flex-row gap-2 items-center mt-5 mb-4">
                            <Text className="text-white text-xl font-subtitle">Total:</Text>

                            <Text className="text-lime-400 text-2xl font-heading">{total}</Text>

                        </View>

                        <Input
                            placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
                            onChangeText={setAddress}
                            onSubmitEditing={handleOrder}
                            blurOnSubmit
                            returnKeyType="next"
                        />
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>

            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>Enviar pedido</Button.Text>
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20} />
                    </Button.Icon>
                </Button>

                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>

        </View >
    );
}
export default Cart;