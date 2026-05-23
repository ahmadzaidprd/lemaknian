import { blogData } from "@/lib/utils";
import Link from "next/link";

export const metadata = { title: "Blog — Bu Yati Catering Bengkulu" };

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#4a3a28] text-xs uppercase tracking-widest mb-3">Blog & Tips</div>
          <h1 className="text-4xl md:text-5xl font-medium text-[#f5efe6] mb-4">
            Tips & inspirasi <span className="text-[#e8c87a]">untuk acara spesial.</span>
          </h1>
          <p className="text-[#5a4a38] text-sm max-w-md mx-auto">
            Artikel praktis seputar pernikahan, hajatan, dan perencanaan acara di Bengkulu.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {blogData.map((post) => (
            <article
              key={post.id}
              className="bg-[#1a1510] border border-[#2a2218] rounded-2xl overflow-hidden card-hover group"
            >
              <div className="h-40 bg-[#1e1a08] flex items-center justify-center text-6xl">
                {post.emoji}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#141008] text-[#4a3a28] text-xs px-3 py-1 rounded-full border border-[#1e1810]">
                    {post.kategori}
                  </span>
                  <span className="text-[#2a2018] text-xs">{post.read_time} menit baca</span>
                </div>
                <h2 className="text-[#d4c4a8] font-medium leading-snug mb-3 line-clamp-2 group-hover:text-[#f5efe6] transition-colors">
                  {post.judul}
                </h2>
                <p className="text-[#3a2a18] text-xs leading-relaxed mb-5 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#2a2018] text-xs">
                    {new Date(post.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#e8c87a] text-xs hover:text-[#f0d48a] transition-colors"
                  >
                    Baca →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Coming soon */}
        <div className="mt-16 text-center border border-[#1e1810] rounded-2xl py-16 px-8">
          <div className="text-4xl mb-4">✍️</div>
          <h3 className="text-[#8a7a65] font-medium mb-2">Artikel baru segera hadir</h3>
          <p className="text-[#3a2a18] text-sm">
            Tips pernikahan, estimasi budget, dan inspirasi menu khas Bengkulu.
          </p>
        </div>
      </div>
    </div>
  );
}
