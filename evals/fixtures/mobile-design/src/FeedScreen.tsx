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
