import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const community = () => {
  // Sample post data
  const posts = [
    {
      id: 1,
      username: 'nature_lover',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      time: '2h ago',
      content: 'Just discovered this beautiful hiking trail! The views were absolutely breathtaking. Highly recommend for weekend adventures. 🏞️ #outdoors #hiking',
      likes: 24,
      comments: 8,
      isLiked: false
    },
    {
      id: 2,
      username: 'urban_explorer',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      time: '5h ago',
      content: 'Does anyone know good coffee shops with outdoor seating in the downtown area? Looking for places to work remotely with some fresh air. ☕',
      likes: 12,
      comments: 15,
      isLiked: true
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFDF7' }}>
      <ScrollView style={{ flex: 1, paddingBottom: 20 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 30, color: '#666', fontFamily: 'Acorn-Regular', marginBottom: 30, paddingTop: 10, marginHorizontal: 20 }}>
            Community
          </Text>
          
          {/* Post creation input */}
          <View style={{ 
            backgroundColor: 'white', 
            padding: 15, 
            marginHorizontal: 20, 
            marginBottom: 20, 
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/women/68.jpg' }} 
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
              />
              <TextInput
                placeholder="Share something with the community..."
                style={{ flex: 1, fontFamily: 'Acorn-Regular', fontSize: 16 }}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
              <TouchableOpacity  style={{ backgroundColor: '#4A6FA5', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 }}>
                <Text style={{ color: 'white', fontFamily: 'Acorn-Regular' }}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Posts list */}
          {posts.map(post => (
            <View key={post.id} style={{ 
              backgroundColor: 'white', 
              padding: 15, 
              marginHorizontal: 20, 
              marginBottom: 15, 
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 2
            }}>
              {/* Post header */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Image 
                  source={{ uri: post.avatar }} 
                  style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
                />
                <View>
                  <Text style={{ fontFamily: 'Acorn-Regular', fontSize: 16, fontWeight: '600' }}>{post.username}</Text>
                  <Text style={{ fontFamily: 'Acorn-Regular', fontSize: 12, color: '#999' }}>{post.time}</Text>
                </View>
              </View>
              
              {/* Post content */}
              <Text style={{ 
                fontFamily: 'Acorn-Regular', 
                fontSize: 16, 
                marginBottom: 15,
                lineHeight: 22
              }}>
                {post.content}
              </Text>
              
              {/* Post actions */}
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                borderTopWidth: 1,
                borderTopColor: '#f0f0f0',
                paddingTop: 12
              }}>
                <TouchableOpacity 
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {/* Handle like */}}
                >
                  <Text style={{ 
                    fontFamily: 'Acorn-Regular', 
                    color: post.isLiked ? '#FF5A5F' : '#666',
                    fontWeight: post.isLiked ? '600' : '400'
                  }}>
                    Like • {post.likes}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {/* Handle comment */}}
                >
                  <Text style={{ fontFamily: 'Acorn-Regular', color: '#666' }}>
                    Comment • {post.comments}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {/* Handle share */}}
                >
                  <Text style={{ fontFamily: 'Acorn-Regular', color: '#666' }}>
                    Share
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default community;