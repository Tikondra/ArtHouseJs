const container = document.querySelector(`.page-section--is-banner`);
const render = (template) => container.insertAdjacentHTML(`beforeend`, template);
const isTrue = () => Math.random() > 0.5;

const templateBanner = () => {
  const twitch = isTrue();
  if (twitch) {
    return (
      `<section class="video-banner">
        <div class="video-banner__wrapper">
          <div>
            <h1 class="video-banner__title">Выступаем поручителем при&nbsp;оформлении <span>кредита&nbsp;для&nbsp;бизнеса</span></h1>
            <ul class="video-banner__list">
              <li class="video-banner__item">Не нужен залог</li>
              <li class="video-banner__item">Сумма кредита больше в 2 раза</li>
              <li class="video-banner__item">Увеличивается вероятность одобрения кредита</li>
            </ul>
            <a class="video-banner__btn" href="#serega-form">Оставить заявку</a>
          </div>

          <div class="video-banner__video-box">
            <p class="video-banner__description">Видео о нашей компании</p>
            <div class="video-banner__video-wrapper">
              <a class="video-banner__video" href="https://azf.su/wp-content/uploads/2019/10/azf2.mp4"></a>
            </div>
          </div>
        </div>
        <script>
          $("a.scroll-to").on("click", function(e){
            e.preventDefault();
            var anchor = $(this).attr('href');
            $('html, body').stop().animate({
                scrollTop: $(anchor).offset().top
            }, 800);
          });
        </script>
      </section>`
    );
  } else {
    return (
      `<div class="page-section__inner">
        <div class="banner">

          <div class="banner__container">
            <div class="banner__title">
              <h1 class="title--main-title-in-banner">
                <span class="text is-primary is-block">Кредит для бизнеса</span>
                <span class="text is-secondary ">Под наше поручительство</span>
              </h1>

              <h3 class="title--sub-title-in-banner banner--line-height">
                Выступим Вашим поручителем в банке для успешного одобрения Вашего кредита
              </h3>
            </div>
<!--            {% set banner_image = TimberImage(post.meta('banner_image')) %}-->
            <div class="banner__images"><img src="https://azf.su/wp-content/uploads/2019/09/main-picture.png" alt="{{banner_image.alt}}"></div>

            <div class="baner__action">
              <form class="form" action="/send.php" method="POST">
                  <h4 class="form__tittle">Форма заявки</h4>
                  <div class="container-element__form">
                      <input class="form__input" name="username" type="text" data-label="Имя" data-rule="username" placeholder="Ваше имя"></input>
                      <input class="form__input" name="telephone" type="tel" data-label="Телефон" placeholder="Ваш телефон"></input>
                      <button class="form__button">Оставить заявку</button>
                  </div>
              </form>

              <div class="video">
                  <a id="video-play-btn" href="https://azf.su/wp-content/uploads/2019/10/azf2.mp4">
                      <img src="https://azf.su/wp-content/themes/azf-theme/assets/images/Видео.svg" alt="Видео">
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>`
    );
  }
};
if (document.querySelector(`#serega-form`)) {
  render(templateBanner());
}

