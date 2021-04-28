<template>
  <div>
<div class="sharebtn">
  <ul class="sharebtn_list">
    <!--はてなブックマーク-->
    <li class="sharebtn_item hatebu"><a href="http://b.hatena.ne.jp/entry/{URLEncodedPermalink}" target="_blank" title="はてなブックマークに登録" rel="nofollow noopener noreferrer" class="hatena-bookmark-button btn_hb bd" data-hatena-bookmark-layout="simple"><i class="blogicon-bookmark"></i></a></li>
    <!--Facebook-->
    <li class="sharebtn_item facebook"><a href="http://www.facebook.com/sharer.php?u={URLEncodedPermalink}" title="Facebookでシェア" target="_blank" rel="nofollow noopener noreferrer" class="btn_fb bd"><i class="fab fa-facebook"></i></a></li>
    <!--Twitter-->
    <li class="sharebtn_item twitter"><a href="http://twitter.com/intent/tweet?text={Title} {URLEncodedPermalink}" title="Twitterでシェア" target="_blank" rel="noopener" class="btn_tw bd"><i class="fab fa-twitter"></i></a></li>
    <!--Pocket-->
    <li class="sharebtn_item pocket"><a href="http://getpocket.com/edit?url={URLEncodedPermalink}title={Title}" title="Pocketに保存" target="_blank" rel="nofollow noopener noreferrer" class="btn_po bd"><i class="fab fa-get-pocket"></i></a></li>
    <!--LINE-->
    <li class="sharebtn_item line"><a href="http://line.me/R/msg/text/?{Title}-{URLEncodedPermalink}" title="LINEに送る" target="_blank" rel="nofollow noopener noreferrer" class="btn_li bd"><i class="fab fa-line"></i></a></li>
  </ul>
</div>

  </div>
</template>

<script>

</script>

<style>
.sharebtn_item a {
  font-size:50px;
  color:green;
    border-radius: 50%;
}

.sharebtn li {
  list-style: none;
}

</style>