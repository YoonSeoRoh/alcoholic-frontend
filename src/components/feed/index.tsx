import React, { useState } from 'react'
import Image from 'next/image'

import * as styles from './styles'
import Category from '@/components/category'
import ProfileDefault from '@/public/assets/profile_default.png'
import Babamba from '@/public/assets/babamba.png'

const Feed = () => {
  const [cheers, set_cheers] = useState(1)
  const [clink, set_clink] = useState(1)

  return (
    <section css={styles.Feed.FeedContainer}>
      <div css={styles.Feed.FeedHeader}>
        <div css={styles.Feed.FeedHeaderProfile}>
          <Image
            src={ProfileDefault}
            alt="회색 배경에 흰 사람 동그란 프로필 이미지"
            width={40}
            height={40}
          />
        </div>
        <div css={styles.Feed.FeedHeaderTitle}>
          <strong>누가바</strong>
          <p>10분 전</p>
        </div>
      </div>

      <div css={styles.Feed.FeedContent}>
        <div css={styles.Feed.FeedContentTitle}>바밤바 막걸리</div>
        <p css={styles.Feed.FeedContentDescription}>
          신상 바밤바 막걸리! 아이스크림 맛이에요 ㅎ.ㅎ
        </p>
        <div css={styles.Feed.FeedContentImage}>
          <Image src={Babamba} alt="바밤바 캔 막걸리" layout="responsive" />
        </div>
      </div>

      <div css={styles.Feed.FeedFooter}>
        <div css={styles.Feed.FeedHash}>
          <section css={styles.Feed.CategoryContainer}>
            <Category
              content={'🍻'}
              count={cheers}
              onClick={() => set_cheers((cheers) => cheers + 1)}
            />
            <Category
              content={'짠!'}
              count={clink}
              onClick={() => set_clink((clink) => clink + 1)}
            />
          </section>
        </div>
        <div css={styles.Feed.FeedComment}>
          <p>
            댓글 <strong>3</strong>개
          </p>
        </div>
      </div>
    </section>
  )
}

export default Feed
