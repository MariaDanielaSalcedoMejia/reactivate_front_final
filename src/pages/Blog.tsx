import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { blogPosts, BlogPost } from "@/data/blog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Calendar, User, Search, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["Todos", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || 
                           selectedCategory === "Todos" ||
                           post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container-accessible py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Blog de Alimentación Saludable
          </h1>
          <p className="text-xl text-muted-foreground">
            Consejos nutricionales para mantener tu bienestar
          </p>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-14 text-lg"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category === "Todos" ? "all" : category)}
                variant={selectedCategory === category || (selectedCategory === "all" && category === "Todos") ? "default" : "outline"}
                size="lg"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <Card 
              key={post.id}
              className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-2"
              onClick={() => setSelectedPost(post)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className="text-sm">{post.category}</Badge>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                <CardDescription className="text-lg">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="lg" className="w-full mt-4">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Leer artículo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-2xl text-muted-foreground">
              No se encontraron artículos que coincidan con tu búsqueda
            </p>
          </Card>
        )}

        {/* Blog Post Detail Dialog */}
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="space-y-4">
                <Badge className="text-sm">{selectedPost?.category}</Badge>
                <DialogTitle className="text-3xl">{selectedPost?.title}</DialogTitle>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="text-lg">{selectedPost?.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg">
                      {selectedPost && new Date(selectedPost.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-lg">{selectedPost?.readTime}</span>
                  </div>
                </div>
              </div>
            </DialogHeader>
            
            <div className="prose prose-lg max-w-none mt-6">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold mt-5 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
                  p: ({ children }) => <p className="text-lg mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="text-lg">{children}</li>,
                  strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
                }}
              >
                {selectedPost?.content || ""}
              </ReactMarkdown>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedPost?.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Blog;
