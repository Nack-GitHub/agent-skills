---
description: "Routing: a natural request that belongs to mobile-design. The skill should be invoked."
expected_outcome: "mobile-design is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Redesign src/FeedScreen.tsx as a touch-friendly card feed for iOS and Android: fix the tap areas, add pull-to-refresh, and make the cards readable on small screens.

The project files:

### package.json

```json
{
  "name": "feed-app",
  "version": "1.0.0",
  "private": true,
  "main": "App.tsx",
  "dependencies": {
    "expo": "~51.0.0",
    "react": "18.2.0",
    "react-native": "0.74.5"
  }
}
```

### src/FeedScreen.tsx

```tsx
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

type Post = { id: string; title: string; author: string };

export function FeedScreen({ posts, onOpen, onLike }: {
  posts: Post[];
  onOpen: (id: string) => void;
  onLike: (id: string) => void;
}) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(p) => p.id}
      renderItem={({ item }) => (
        <View style={{ padding: 4, borderBottomWidth: 1 }}>
          <TouchableOpacity onPress={() => onOpen(item.id)}>
            <Text style={{ fontSize: 11 }}>{item.title}</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 9, color: '#bbb' }}>{item.author}</Text>
          <TouchableOpacity onPress={() => onLike(item.id)} style={{ width: 16, height: 16 }}>
            <Text>♥</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
```
