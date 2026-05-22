import React, { useMemo } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Heart, MapPin, MessageCircle } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { getStoryMoments } from '../../data/mockStories';
import { Button } from '../../components/ui/Button';
import { shareToWhatsApp } from '../../lib/share';
import type { StoriesStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<StoriesStackParamList, 'Stories'>;

export function StoriesScreen({ navigation }: Props) {
  const theme = useTheme();
  const stories = useMemo(() => getStoryMoments(), []);

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Trip Stories</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
          Momente rapide din comunitatea TrailNest
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ringRow}
      >
        {stories.map((story) => (
          <Pressable
            key={`ring-${story.id}`}
            style={styles.ringItem}
            onPress={() => navigation.navigate('StoryViewer', { storyId: story.id })}
          >
            <View
              style={[
                styles.avatarRing,
                {
                  borderColor: story.hasUnseen
                    ? theme.colors.accent
                    : theme.colors.border,
                },
              ]}
            >
              <Image source={{ uri: story.userAvatar }} style={styles.avatar} />
            </View>
            <Text
              style={[styles.ringName, { color: theme.colors.text }]}
              numberOfLines={1}
            >
              {story.userName}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.feed}>
        {stories.map((story) => (
          <View
            key={story.id}
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.lg,
              },
            ]}
          >
            <Pressable
              onPress={() => navigation.navigate('StoryViewer', { storyId: story.id })}
            >
              <ImageBackground source={{ uri: story.image }} style={styles.storyImage}>
                <View style={[styles.imageOverlay, { backgroundColor: theme.colors.overlay }]} />
                <View style={styles.imageMeta}>
                  <View style={styles.userRow}>
                    <Image source={{ uri: story.userAvatar }} style={styles.userAvatarSmall} />
                    <View>
                      <Text style={styles.userName}>{story.userName}</Text>
                      <Text style={styles.timeText}>{story.postedAt}</Text>
                    </View>
                  </View>
                  <View style={styles.locationRow}>
                    <MapPin size={14} color="#ffffff" />
                    <Text style={styles.locationText}>
                      {story.trailName} • {story.region}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </Pressable>

            <View style={styles.cardBody}>
              <Text style={[styles.caption, { color: theme.colors.text }]}>{story.caption}</Text>
              <View style={styles.cardFooter}>
                <View style={styles.likesRow}>
                  <Heart size={16} color={theme.colors.accent} fill={theme.colors.accent} />
                  <Text style={{ color: theme.colors.textMuted }}>{story.likes} aprecieri</Text>
                </View>
                <Button
                  title="Share pe WhatsApp"
                  size="sm"
                  variant="outline"
                  leftIcon={<MessageCircle size={15} color={theme.colors.primary} />}
                  onPress={() =>
                    shareToWhatsApp(
                      `${story.userName} a postat din ${story.trailName}: "${story.caption}" - trimis din TrailNest`
                    )
                  }
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
  },
  ringRow: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  ringItem: {
    width: 72,
    alignItems: 'center',
    gap: 6,
  },
  avatarRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    padding: 3,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  ringName: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  feed: {
    marginTop: 16,
    paddingHorizontal: 16,
    gap: 14,
  },
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  storyImage: {
    height: 240,
    justifyContent: 'space-between',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  imageMeta: {
    padding: 12,
    gap: 8,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userAvatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.75)',
  },
  userName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  timeText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    padding: 12,
    gap: 10,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
