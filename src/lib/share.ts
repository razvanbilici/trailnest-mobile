import { Alert, Linking, Share } from 'react-native';

export async function shareToWhatsApp(message: string): Promise<void> {
  try {
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `whatsapp://send?text=${encodedText}`;
    const canOpenWhatsApp = await Linking.canOpenURL(whatsappUrl);

    if (canOpenWhatsApp) {
      await Linking.openURL(whatsappUrl);
      return;
    }

    Alert.alert(
      'WhatsApp indisponibil',
      'Nu am găsit aplicația WhatsApp. Se deschide dialogul de share al telefonului.'
    );
    await Share.share({
      message,
      title: 'Distribuie pe WhatsApp',
    });
  } catch (error) {
    Alert.alert(
      'Share indisponibil',
      'Nu am putut porni distribuirea momentan. Încearcă din nou.'
    );
  }
}
