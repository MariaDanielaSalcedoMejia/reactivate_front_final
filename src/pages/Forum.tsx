import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, ThumbsUp, Send, Plus, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Comment {
  id: string;
  postId: string;
  author: string;
  authorId: string;
  content: string;
  date: string;
  likes: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  date: string;
  likes: number;
  comments: number;
}

const Forum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadForumData();
  }, []);

  const loadForumData = () => {
    const savedPosts = localStorage.getItem("reactivate_forum_posts");
    const savedComments = localStorage.getItem("reactivate_forum_comments");
    
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  };

  const createPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: user?.name || "Usuario",
      authorId: user?.id || "unknown",
      date: new Date().toISOString(),
      likes: 0,
      comments: 0,
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("reactivate_forum_posts", JSON.stringify(updatedPosts));

    setNewPostTitle("");
    setNewPostContent("");
    setIsDialogOpen(false);

    toast({
      title: "¡Publicación creada!",
      description: "Tu publicación ya está visible para la comunidad",
    });
  };

  const likePost = (postId: string) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("reactivate_forum_posts", JSON.stringify(updatedPosts));
  };

  const addComment = () => {
    if (!newComment.trim() || !selectedPost) return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId: selectedPost.id,
      author: user?.name || "Usuario",
      authorId: user?.id || "unknown",
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem("reactivate_forum_comments", JSON.stringify(updatedComments));

    const updatedPosts = posts.map(post =>
      post.id === selectedPost.id ? { ...post, comments: post.comments + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("reactivate_forum_posts", JSON.stringify(updatedPosts));

    setNewComment("");
    toast({
      title: "Comentario agregado",
      description: "Tu comentario ha sido publicado",
    });
  };

  const getPostComments = (postId: string) => {
    return comments.filter(comment => comment.postId === postId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container-accessible py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Foro Comunitario
            </h1>
            <p className="text-xl text-muted-foreground">
              Comparte experiencias y conecta con otros miembros
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 text-lg">
                <Plus className="w-5 h-5" />
                Nueva publicación
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl">Crear nueva publicación</DialogTitle>
                <DialogDescription className="text-lg">
                  Comparte tus experiencias, preguntas o consejos con la comunidad
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg">Título</Label>
                  <Input
                    id="title"
                    placeholder="¿Sobre qué quieres hablar?"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="h-12 text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-lg">Contenido</Label>
                  <Textarea
                    id="content"
                    placeholder="Escribe tu mensaje aquí..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[200px] text-lg"
                  />
                </div>

                <Button onClick={createPost} size="lg" className="w-full text-lg">
                  Publicar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <Card className="p-12 text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">Aún no hay publicaciones</h3>
              <p className="text-xl text-muted-foreground mb-6">
                Sé el primero en compartir algo con la comunidad
              </p>
              <Button onClick={() => setIsDialogOpen(true)} size="lg">
                Crear primera publicación
              </Button>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg">{post.content}</p>
                  
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => likePost(post.id)}
                      className="gap-2"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      {post.likes} Me gusta
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setSelectedPost(post)}
                      className="gap-2"
                    >
                      <MessageSquare className="w-5 h-5" />
                      {post.comments} Comentarios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Comments Dialog */}
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedPost?.title}</DialogTitle>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{selectedPost?.author}</span>
                </div>
                <span>•</span>
                <span>{selectedPost && new Date(selectedPost.date).toLocaleDateString()}</span>
              </div>
            </DialogHeader>
            
            <div className="space-y-6">
              <p className="text-lg">{selectedPost?.content}</p>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-4">Comentarios</h3>
                
                {/* Comment Form */}
                <div className="space-y-3 mb-6">
                  <Textarea
                    placeholder="Escribe un comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px] text-lg"
                  />
                  <Button onClick={addComment} size="lg" className="gap-2">
                    <Send className="w-5 h-5" />
                    Comentar
                  </Button>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {selectedPost && getPostComments(selectedPost.id).length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Aún no hay comentarios. Sé el primero en comentar.
                    </p>
                  ) : (
                    selectedPost && getPostComments(selectedPost.id).map((comment) => (
                      <Card key={comment.id} className="bg-muted/50">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span className="font-semibold">{comment.author}</span>
                            <span>•</span>
                            <span>{new Date(comment.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-lg">{comment.content}</p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Forum;
