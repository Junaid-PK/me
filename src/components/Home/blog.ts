export interface Blog {
  id: number;
  title: string;
  slug: null;
  content: string;
  meta_description: string;
  featured_image: string;
  status: string;
  published_at: null;
  is_featured: number;
  category_id: number;
  read_time: null;
  author: null;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    name: string;
  };
}
