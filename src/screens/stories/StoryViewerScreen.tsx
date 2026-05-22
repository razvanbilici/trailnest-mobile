import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MessageCircle, X } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { getStoryMoments } from '../../data/mockStories';
import { shareToWhatsApp } from '../../lib/share';
import { Button } from '../../components/ui/Button';
import type { StoriesStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<StoriesStackParamList, 'StoryViewer'>;

const STORY_DURATION_MS = 5000;

export function StoryViewerScreen({ navigation, route }: Props) {
  const theme = useTheme();
  const stories = useMemo(() => getStoryMoments(), []);
  const initialIndex = Math.max(
    0,
    stories.findIndex((story) => story.id === route.params.storyId)
  );
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const story = stories[currentIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex((idx) => idx + 1);
        return;
      }
      navigation.goBack();
    }, STORY_DURATION_MS);

    return () => clearTimeout(timer);
  }, [currentIndex, navigation, stories.length]);

  if (!story) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: story.image }} style={styles.background}>
        <View style={[styles.overlay, { backgroundColor: theme.colors.overlay }]} />

        <View style={styles.topContent}>
          <View style={styles.progressRow}>
            {stories.map((item, idx) => (
              <View
                key={item.id}
                style={[
                  styles.progressTrack,
                  { backgroundColor: 'rgba(255,255,255,0.28)' },
                ]}
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      backgroundColor: '#ffffff',
                      width: idx < currentIndex ? '100%' : idx === currentIndex ? '45%' : '0%',
                    },
                  ]}
                />
              </View>
            ))}
          </View>

          <View style={styles.headerRow}>
            <View style={styles.userRow}>
              <Image source={{ uri: story.userAvatar }} style={styles.avatar} />
              <View>
                <Text style={styles.userName}>{story.userName}</Text>
                <Text style={styles.timeText}>{story.postedAt}</Text>
              </View>
            </View>
            <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
              <X color="#ffffff" size={22} />
            </Pressable>
          </View>
        </View>

        <View style={styles.bottomContent}>
          <Text style={styles.locationText}>
            {story.trailName} • {story.region}
          </Text>
          <Text style={styles.captionText}>{story.caption}</Text>
          <Button
            title="Share pe WhatsApp"
            variant="outline"
            leftIcon={<MessageCircle size={15} color="#ffffff" />}
            style={styles.shareButton}
            onPress={() =>
              shareToWhatsApp(
                `${story.userName} a postat din ${story.trailName}: "${story.caption}" - trimis din TrailNest`
              )
            }
          />
        </View>

        <View style={styles.tapZones}>
          <Pressable
            style={styles.tapZone}
            onPress={() =>
              setCurrentIndex((idx) => (idx > 0 ? idx - 1 : idx))
            }
          />
          <Pressable
            style={styles.tapZone}
            onPress={() => {
              if (currentIndex < stories.length - 1) {
                setCurrentIndex((idx) => idx + 1);
                return;
              }
              navigation.goBack();
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  background: {
    flex: 1,
    justifyContent: 'space-between',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  topContent: {
    paddingTop: 52,
    paddingHorizontal: 12,
    gap: 10,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 6,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.75)',
  },
  userName: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  timeText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    marginTop: 1,
  },
  bottomContent: {
    paddingHorizontal: 16,
    paddingBottom: 26,
    gap: 10,
  },
  locationText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  captionText: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 22,
  },
  shareButton: {
    borderColor: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.18)',
    minWidth: 180,
  },
  tapZones: {
    ...StyleSheet.absoluteFillObject,
    top: 95,
    bottom: 120,
    flexDirection: 'row',
  },
  tapZone: {
    flex: 1,
  },
});
